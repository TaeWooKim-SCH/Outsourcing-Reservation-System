export default function TimeCheck({ value, onChange, children }: React.ComponentProps<'input'>) {
  return (
    <label>
      <input className="pl-3" type="checkbox" value={value} onChange={onChange} />
      {value}
    </label>
  );
}