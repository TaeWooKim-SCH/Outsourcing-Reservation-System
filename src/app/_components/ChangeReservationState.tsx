export default function ChangeReservationState({ reservId }: PropsType) {
  const approvePost = async () => {
    const res = await fetch("/api/admin/approve", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: reservId,
        reservationState: "승인"
      })
    });
    if (res.ok) {
      alert("대여를 승인시켰습니다.");
      window.location.reload();
    }
  }

  const refusePost = async () => {
    const res = await fetch("/api/admin/approve", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: reservId,
        reservationState: "거절"
      })
    });
    if (res.ok) {
      alert("대여를 거절시켰습니다.");
      window.location.reload();
    }
  }

  return (
    <td className="flex">
      <button
        className="px-[8px] mr-1 py-[2px] border border-black rounded-md text-sm"
        type="button"
        onClick={approvePost}
      >승인</button>
      <button
        className="px-[8px] py-[2px] border border-black rounded-md text-sm"
        type="button"
        onClick={refusePost}
      >거절</button>
    </td>
  );
}

interface PropsType {
  reservId: string;
}