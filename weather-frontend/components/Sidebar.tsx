import { fetchWeather } from "@/lib/actions";

const Sidebar = async () => {
    const weather = await fetchWeather({ city: "Nairobi" });

  return (
    <div>
      <pre>
        <code>{JSON.stringify(weather, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Sidebar;