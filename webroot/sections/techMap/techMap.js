const EXPAND_PADDING = '9px 15px 9px 15px'
const NORMAL_PADDING = '6px  12px 6px  12px'
const SMALL_PADDING = '5px  10px  5px  10px'
const NORMAL_MARGIN = '1px 1px  4px  1px'
const SMALL_MARGIN = '0px 0px 3px 0px'

window.techMapItemClick = function techMapItemClick (event) {
  let techMapRoot = $(event.target).parent().parent().parent()

  if ($(event.target).attr('expanded') != 'true') {
    // item not expanded lets expand.
    let descriptionTag = $(event.target).attr('data')

    clearSelection(techMapRoot)
    let descArea = $(techMapRoot).children("div[tag='" + descriptionTag + "']")
    descArea.css('display', 'flex')

    $(event.target).css('border', '2px solid white')
    $(event.target).attr('expanded', 'true')
  } else {
    // item already expanded lets collapse
    clearSelection(techMapRoot)
  }
}

function clearSelection (techMapRoot) {
  // hide all description areas
  $(techMapRoot).children('div.description-area').css('display', 'none')

  // remove all highlights
  $(techMapRoot).children('div.row').children().children().css('border', '')
  // remove expand
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

function isClose (x, y, th) {
  if (Math.abs(x - y) < th) {
    return true
  }
  return false
}

/*
  Handle fancy item expansion on hover. When the user hovers an Item it will expand
  by increasing padding and reducing its margin. In addition all elements in the same row
  will reduce in size.
*/
window.techMapHoverIn = function hoverIn (event) {
  if ($(event.target).is('button')) {
    $(event.target).siblings('button').each((i, obj) => {
      if (isClose($(event.target).position().top, $(obj).position().top, 10)) {
        $(obj).css('padding', SMALL_PADDING)
      }
    })

    $(event.target).css('padding', EXPAND_PADDING)
    $(event.target).css('margin', SMALL_MARGIN)
  }
}

window.techMapHoverOut = function hoverOut (event) {
  if ($(event.target).is('button')) {
    $(event.target).parent().children('button').css('padding', NORMAL_PADDING)
    $(event.target).parent().children('button').css('margin', NORMAL_MARGIN)
  }
}
