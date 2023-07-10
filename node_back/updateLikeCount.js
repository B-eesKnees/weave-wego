function updateLikeCount(io, boardId, count) {
  io.emit(`like_count_${boardId}`, count);
}

module.exports = updateLikeCount;
