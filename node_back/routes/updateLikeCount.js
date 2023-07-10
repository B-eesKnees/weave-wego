// 좋아요 업데이트를 위한 함수
function updateLikeCount(io, boardId, count) {
  io.emit(`like_count_${boardId}`, count);
}

module.exports = updateLikeCount;
