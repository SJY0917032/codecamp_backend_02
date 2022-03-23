/*
주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 
숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, 
nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.
*/
function solution(nums) {
  temp = [];
  //2부터 N-1의 수로 나눠서 나눠지는 수가 있으면 소수가 아니다.
  for (i = 0; i < nums.length; i++) {
    for (j = i + 1; j < nums.length; j++) {
      if (j === i) {
        continue;
      }
      for (k = j + 1; k < nums.length; k++) {
        if (k === j || i === k) {
          continue;
        }
        temp.push(nums[i] + nums[j] + nums[k]);
      }
    }
  }

  result = temp.filter((x) => {
    for (aa = 2; aa <= x - 1; aa++) {
      if (x % aa === 0) {
        return false;
      }
    }
    return true;
  });
  return result.length === 0 ? 0 : result.length;
}
