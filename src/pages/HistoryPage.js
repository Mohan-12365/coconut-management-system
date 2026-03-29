
const [date, setDate] = useState("");
const [results, setResults] = useState([]);

const fetchTrips = () => {
  api.get(`/trips/by-date?date=${date}`)
     .then(res => setResults(res.data))
     .catch(err => console.log(err));
};

<h2>Trip History</h2>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

<button onClick={fetchTrips}>Search</button>

<h2>Trip History</h2>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

<button onClick={fetchTrips}>Search</button>
{results.map((labour, index) => (
  <div key={index}>
    {labour.name} - ₹{labour.wage}

    <button onClick={() => {

      const message = `Hi ${labour.name},

📅 Date: ${date}
💰 Wage: ₹${labour.wage}
${labour.driver ? "🚗 Driver" : ""}

Thanks!`;

      const url = `https://wa.me/91${labour.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

    }}>
      Send WhatsApp
    </button>
  </div>
))}
