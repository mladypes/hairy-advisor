// nicer random distribution. inspired by https://bost.ocks.org/mike/algorithms/
export function sample(samples, numCandidates, width, height) {
  let bestDistance = 0, bestCandidate
  for (let i = 0; i < numCandidates; ++i) {
    const c = {x: Math.random() * width, y: Math.random() * height}
    const d = squaredDistance(findClosest(samples, c), c)
    if (d > bestDistance) {
      bestDistance = d
      bestCandidate = c
    }
  }
  return bestCandidate
}

function findClosest(samples, position) {
  return samples.reduce((acc, v) => squaredDistance(v.position, position) < squaredDistance(acc, position) ? v.position : acc, {x:999999, y:999999})
}

function squaredDistance(a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return dx * dx + dy * dy
}