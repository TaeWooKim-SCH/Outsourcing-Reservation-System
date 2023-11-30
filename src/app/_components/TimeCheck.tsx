export default function TimeCheck({ value, onChange, disabled }: React.ComponentProps<'input'>) {
  return (
    <label>
      <input className="mr-2" type="checkbox" value={value} onChange={onChange} disabled={disabled} />
      {value}
    </label>
  );
}