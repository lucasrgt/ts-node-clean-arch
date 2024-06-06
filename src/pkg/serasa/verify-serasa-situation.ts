export interface SerasaSituation {
  situation: string;
  canPass: boolean;
}

export function verifySerasaSituation(name: string): SerasaSituation {
  if (name === "Bob") {
    return { situation: "your serasa situation is very good!", canPass: true };
  }

  return { situation: "your serasa situation is not good!", canPass: false };
}
