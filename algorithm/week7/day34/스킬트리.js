function solution(skill, skill_trees) {
  // // 스킬트리에 해당하는 문자열만 밸수있게 정규식을 만든다
  // const regex = new RegExp(`[^${skill}]`, "g");

  // // 정규식을 적용해 스킬트리에 해당하지않는 스킬들을 제외시킨다
  // const replace = skill_trees.map((e) => {
  //   return e.replace(regex, "");
  // });

  // // 그후 나온 스킬트리가
  // // 만약 e의 길이만큼 자른 스킬트리하고 다르다면
  // // 스킬트리와 맞지않음 => false
  // // 같으면 true
  // const isPossible = replace.map((e) => {
  //   return skill.substring(0, e.length) == e;
  // });

  // // 최종적으로 나온 배열을 filter를통해 true값만 남기고 그 길이를 반환
  // return isPossible.filter((e) => e).length;

  // 4.28 리팩터링 추가

  return skill_trees.reduce((acc, cur) => {
    const filter = cur
      .split("")
      .filter((e) => {
        return skill.includes(e);
      })
      .join("");
    return (acc += (skill.includes(filter) && skill.indexOf(filter[0]) === 0) || filter === "" ? 1 : 0);
  }, 0);
}
