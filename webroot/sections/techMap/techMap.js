
window.techMapItemClick = function techMapItemClick (event) {
  let techMapRoot = $(event.target).parent().parent().parent()
  let descriptionTag = $(event.target).attr('data')

  clearAllEffects(techMapRoot)
  let descArea = $(techMapRoot).children("div[tag='" + descriptionTag + "']")
  descArea.css('display', 'flex')

  $(event.target).css('border', '2px solid white')
}

function clearAllEffects (techMapRoot) {
  // hide all description areas
  $(techMapRoot).children('div.description-area').css('display', 'none')

  // remove all highlights
  $(techMapRoot).children('div.row').children().children().css('border', '')
}
