export function generateDailyNickname(uid: string): string {
  const adjectives = ["수상한", "진지한", "유쾌한", "고독한", "예리한"];
  const nouns = ["포토샵 유저", "코드 마법사", "커피 요정", "문서 파괴자", "버그 추적자"];
  const seed = uid.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const day = new Date().getDate();
  const adj = adjectives[(seed + day) % adjectives.length];
  const noun = nouns[(seed + day * 7) % nouns.length];
  return `${adj} ${noun}`;
}