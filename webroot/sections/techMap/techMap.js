const EXPAND_STATE = '10px 15px 10px 15px'

window.techMapItemClick = function techMapItemClick (event) {
  let techMapRoot = $(event.target).parent().parent().parent()

  if ($(event.target).attr('expanded') != 'true') {
    // item not expanded lets expand.
    let descriptionTag = $(event.target).attr('data')

    clearAllEffects(techMapRoot)
    let descArea = $(techMapRoot).children("div[tag='" + descriptionTag + "']")
    descArea.css('display', 'flex')

    $(event.target).parent().css('flex-grow', '1.05')
    $(event.target).css('border', '2px solid white')
    $(event.target).css('padding', EXPAND_STATE)
    $(event.target).attr('expanded', 'true')
  } else {
    // item already expanded lets collapse
    clearAllEffects(techMapRoot)
  }
}

function clearAllEffects (techMapRoot) {
  // reset flex
  $(techMapRoot).children('div.row').children('div.col').css('flex-grow', '1.0')
  // hide all description areas
  $(techMapRoot).children('div.description-area').css('display', 'none')

  // remove all highlights
  $(techMapRoot).children('div.row').children().children().css('border', '')
  // remove expand
  $(techMapRoot).children('div.row').children().children().css('padding', '')
  $(techMapRoot).children('div.row').children().children().attr('expanded', 'false')
}

// return true if a column has an expanded element
function hasExpanded (col) {
  let expandedItems = $(col).children('button[expanded=\'true\']')
  if (expandedItems.length != 0) {
    return true
  }
  return false
}

// do manual onHover handling as CSS :hover will not work if you set properties from JS.
window.techMapHoverIn = function hoverIn (event) {
  $(event.target).css('flex-grow', '1.05')
}

window.techMapHoverOut = function hoverOut (event) {
  if (!hasExpanded(event.target)) {
    $(event.target).css('flex-grow', '1.0')
  }
}
