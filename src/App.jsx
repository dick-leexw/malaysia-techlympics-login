const { useMemo, useState } = React;

const roles = ["Student", "Teacher", "Judge", "Admin"];

const journeySteps = [
  "Online Screening",
  "Zonal Competition",
  "National Finals",
  "Outreach",
  "International Stage"
];

function Header() {
  return (
    <header className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg border border-teal/40 bg-white/10 shadow-glow">
          <span className="text-lg font-black text-teal">MT</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-teal">National STI Programme</p>
          <h1 className="text-lg font-bold text-white sm:text-xl">Malaysia Techlympics 2026</h1>
        </div>
      </div>
      <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 sm:flex">
        <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_18px_rgba(22,184,166,0.9)]"></span>
        Smart Saringan 2.0
      </div>
    </header>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-12 w-full rounded-md border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/15 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
      {error && <span className="mt-2 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function RoleSelector({ value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">Role</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`h-11 rounded-md border px-3 text-sm font-semibold transition ${
              value === role
                ? "border-teal bg-teal text-navy shadow-[0_12px_28px_rgba(22,184,166,0.24)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-teal/60 hover:bg-teal/5"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const secureNote = useMemo(() => `Secure ${role.toLowerCase()} login for Malaysia Techlympics 2026`, [role]);

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Enter your email, IC, or student ID.";
    }

    if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setMessage(`Login successful. Welcome, ${role}.`);
      window.setTimeout(() => setMessage(""), 3600);
    } else {
      setMessage("");
    }
  }

  return (
    <section className="w-full max-w-xl rounded-lg bg-white p-5 text-slate-900 shadow-2xl shadow-black/25 sm:p-8">
      <div className="mb-7">
        <span className="inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase text-teal-dark">
          Official Portal
        </span>
        <h2 className="mt-4 text-3xl font-black text-navy">Sign in to your account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Access screening records, team registration, judging tools, and programme dashboards.
        </p>
      </div>

      {message && (
        <div className="mb-5 rounded-md border border-teal/40 bg-teal/10 px-4 py-3 text-sm font-semibold text-teal-dark">
          {message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Field
          label="Email / IC / Student ID"
          value={email}
          onChange={setEmail}
          placeholder="example@student.edu.my"
          error={errors.email}
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          error={errors.password}
        />
        <RoleSelector value={role} onChange={setRole} />

        <button
          type="submit"
          className="h-12 w-full rounded-md bg-navy px-5 text-sm font-bold text-white shadow-lg shadow-navy/25 transition hover:bg-navy-soft focus:outline-none focus:ring-4 focus:ring-teal/25"
        >
          Login
        </button>
      </form>

      <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <a className="font-semibold text-teal-dark hover:text-navy" href="#forgot">
          Forgot password?
        </a>
        <a className="font-semibold text-teal-dark hover:text-navy" href="#register">
          Register new team
        </a>
      </div>

      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
        <MiniNote title="Secure Login" body={secureNote} />
        <MiniNote title="PAJSK-Ready" body="Participation record prepared for reporting." />
        <MiniNote title="Teacher Access" body="Dashboard-ready for team coordination." />
      </div>
    </section>
  );
}

function MiniNote({ title, body }) {
  return (
    <div className="border-l-2 border-teal bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-teal-dark">{title}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{body}</p>
    </div>
  );
}

function VisualPanel() {
  return (
    <section className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/15 bg-white/10 p-6 shadow-glow backdrop-blur lg:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px]"></div>
      <div className="absolute right-0 top-14 h-px w-3/4 bg-gradient-to-l from-teal/70 to-transparent"></div>
      <div className="absolute bottom-20 left-0 h-px w-2/3 bg-gradient-to-r from-gold/70 to-transparent"></div>
      <div className="relative">
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-black uppercase text-navy">
            Smart Saringan 2.0
          </span>
          <span className="rounded-full border border-teal/40 px-3 py-1 text-xs font-semibold text-teal">
            Robotics | AI | Drone | STEM
          </span>
        </div>

        <h2 className="max-w-lg text-3xl font-black leading-tight text-white sm:text-4xl">
          From Online Screening to National Finals
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
          A unified student innovation journey built for discovery, outreach, assessment, and national-level recognition.
        </p>

        <div className="mt-9 space-y-4">
          {journeySteps.map((step, index) => (
            <JourneyStep key={step} step={step} index={index} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <Stat value="5" label="Stages" />
          <Stat value="14+" label="STEM Tracks" />
          <Stat value="MY" label="Nationwide" />
        </div>
      </div>
    </section>
  );
}

function JourneyStep({ step, index }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-white/12 bg-navy/45 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal text-sm font-black text-navy">
        {index + 1}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{step}</p>
        <p className="mt-1 text-xs text-slate-300">
          {index === 0 ? "Digital assessment and qualification flow" : "Progress tracking across programme milestones"}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-md border border-white/12 bg-white/8 p-3 text-center">
      <p className="text-xl font-black text-teal">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase text-slate-300">{label}</p>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#07182f_0%,#0c2545_45%,#087f7c_135%)]">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:64px_64px]"></div>
        <div className="absolute left-0 top-24 h-px w-1/2 bg-gradient-to-r from-teal/50 to-transparent"></div>
        <div className="absolute bottom-24 right-0 h-px w-1/2 bg-gradient-to-l from-gold/40 to-transparent"></div>
      </div>
      <Header />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-5 pb-10 pt-2 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:pb-14">
        <div className="flex items-center">
          <LoginCard />
        </div>
        <VisualPanel />
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
