export const holidayFetch = async (year: string, month: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_HOLIDAY_KEY;
  const API_URL = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?_type=json&solYear=${year}&solMonth=${month}&ServiceKey=${API_KEY}`;
  const res = await fetch(API_URL);
  const json = await res.json();
  return json.response.body;
}