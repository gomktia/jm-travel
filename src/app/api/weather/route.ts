import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/weather?lat=-3.49&lon=-39.27
 *
 * Busca clima atual via Open-Meteo API (100% grátis, sem key).
 * Retorna: temperatura, condição, umidade, vento.
 * Cache de 1h (revalidate: 3600).
 */

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
}

/* WMO Weather interpretation codes → emoji + label */
const weatherCodes: Record<number, { emoji: string; pt: string; en: string; es: string }> = {
  0: { emoji: "☀️", pt: "Céu limpo", en: "Clear sky", es: "Cielo despejado" },
  1: { emoji: "🌤️", pt: "Parcialmente limpo", en: "Mainly clear", es: "Parcialmente despejado" },
  2: { emoji: "⛅", pt: "Parcialmente nublado", en: "Partly cloudy", es: "Parcialmente nublado" },
  3: { emoji: "☁️", pt: "Nublado", en: "Overcast", es: "Nublado" },
  45: { emoji: "🌫️", pt: "Neblina", en: "Fog", es: "Niebla" },
  48: { emoji: "🌫️", pt: "Neblina gelada", en: "Rime fog", es: "Niebla helada" },
  51: { emoji: "🌦️", pt: "Garoa leve", en: "Light drizzle", es: "Llovizna ligera" },
  53: { emoji: "🌦️", pt: "Garoa moderada", en: "Moderate drizzle", es: "Llovizna moderada" },
  55: { emoji: "🌧️", pt: "Garoa intensa", en: "Dense drizzle", es: "Llovizna intensa" },
  61: { emoji: "🌧️", pt: "Chuva leve", en: "Light rain", es: "Lluvia ligera" },
  63: { emoji: "🌧️", pt: "Chuva moderada", en: "Moderate rain", es: "Lluvia moderada" },
  65: { emoji: "🌧️", pt: "Chuva forte", en: "Heavy rain", es: "Lluvia fuerte" },
  71: { emoji: "🌨️", pt: "Neve leve", en: "Light snow", es: "Nieve ligera" },
  73: { emoji: "🌨️", pt: "Neve moderada", en: "Moderate snow", es: "Nieve moderada" },
  75: { emoji: "❄️", pt: "Neve forte", en: "Heavy snow", es: "Nieve fuerte" },
  80: { emoji: "🌦️", pt: "Pancadas leves", en: "Light showers", es: "Chubascos ligeros" },
  81: { emoji: "🌧️", pt: "Pancadas moderadas", en: "Moderate showers", es: "Chubascos moderados" },
  82: { emoji: "⛈️", pt: "Pancadas fortes", en: "Heavy showers", es: "Chubascos fuertes" },
  95: { emoji: "⛈️", pt: "Tempestade", en: "Thunderstorm", es: "Tormenta" },
  96: { emoji: "⛈️", pt: "Tempestade com granizo", en: "Thunderstorm with hail", es: "Tormenta con granizo" },
  99: { emoji: "⛈️", pt: "Tempestade severa", en: "Severe thunderstorm", es: "Tormenta severa" },
};

function getWeatherInfo(code: number) {
  return weatherCodes[code] || weatherCodes[0];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon parameters required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day`,
      { next: { revalidate: 3600 } }
    );
    const data: OpenMeteoResponse = await res.json();
    const current = data.current;
    const weather = getWeatherInfo(current.weather_code);

    return NextResponse.json({
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
      emoji: weather.emoji,
      condition: { pt: weather.pt, en: weather.en, es: weather.es },
    }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800" },
    });
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
