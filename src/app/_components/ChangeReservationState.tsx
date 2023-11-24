export default function ChangeReservationState() {
  return (
    <td className="flex">
      <button
        className="px-[8px] mr-1 py-[2px] border border-black rounded-md text-sm"
        type="button"
      >승인</button>
      <button
        className="px-[8px] py-[2px] border border-black rounded-md text-sm"
        type="button"
      >거절</button>
    </td>
  );
}