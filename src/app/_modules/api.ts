export const reservationDataFetching = async () => {
  try {
    const res = await fetch("/api/reservation");
    const json: DataType[] = await res.json();
    json.sort((a: DataType, b: DataType) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      else {
        return 1;
      }
    })
    return json;
  }
  catch(error) {
    console.error(error);
  }
}

export const loginPost = async (form: {name: string, phoneNumber: string}) => {
  if (!form.name) return alert("이름을 입력해주세요.");
  else if (!form.phoneNumber) return alert("전화번호를 입력해주세요.");

  const res = await fetch('/api/user/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });
  const json: DataType[] = await res.json();
  json.sort((a: DataType, b: DataType) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    }
    else {
      return 1;
    }
  })
  if (!res.ok) return alert("대여 목록이 존재하지 않습니다. 이름 또는 전화번호를 확인하세요.");
  else {
    return json;
  };
}

interface DataType {
  _id: string;
  date: string;
  phoneNumber: string;
  reason: string;
  reservationState: string;
  roomNumber: number;
  studentId: string;
  studentName: string;
  time: string[];
}