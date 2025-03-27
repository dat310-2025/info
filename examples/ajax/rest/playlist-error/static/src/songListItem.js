function createSongListItem(song, onDelete, onRetry) {
  let listItem = document.createElement("li");

  if (song.saving) {
    let savingImg = document.createElement("img");
    savingImg.src = "/static/images/saving.gif";
    savingImg.alt = "saving";
    savingImg.className = "saving";
    savingImg.onclick = function () {
      onRetry(song);
    };
    listItem.appendChild(savingImg);
  } else {
    let deleteImg = document.createElement("img");
    deleteImg.src = "/static/images/delete.png";
    deleteImg.alt = "delete";
    deleteImg.className = "delete";
    deleteImg.onclick = function () {
      onDelete(song);
    };
    listItem.appendChild(deleteImg);
  }
  
  let nameDiv = document.createElement("div");
  nameDiv.textContent = song.name;

  let bandDiv = document.createElement("div");
  bandDiv.textContent = song.band;

  
  
  listItem.appendChild(nameDiv);
  listItem.appendChild(bandDiv);

  return listItem;
}
