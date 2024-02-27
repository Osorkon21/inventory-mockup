const currentDay = $("#currentDay");
const timeBlocksDiv = $(".time-blocks");

// dayjs object with current date/time
var now = dayjs();

start();

// adds elements to page
function start() {
  setDate();
  renderTimeBlocks();
}

// adds current date to top of screen
function setDate() {

  // // "Do" displays today's date with ordinal - requires "advancedFormat" plugin to work
  currentDay.text(now.format("dddd, MMMM Do"));
}

// adds time block elements, adds localStorage contents if they exist
function renderTimeBlocks() {

  // today's date with time set to 9 AM
  var todayAtNine = dayjs(now.format("MM/DD/YYYY ") + "09:00:00");

  // adds time block elements spanning 9 AM to 5 PM
  for (var i = 0; i < 8; i++) {

    // time block's time
    var blockTime = todayAtNine.add(i, "hour");

    // difference between now and the time block's time, in hours
    var timeDiff = blockTime.diff(now, "hour");

    // id of time block
    var id = "hour-" + blockTime.format("H");

    // localStorage string, if it exists
    var textAreaVal = JSON.parse(localStorage.getItem(id)) || "";

    // raw HTML to append, populated with necessary variables
    timeBlocksDiv.append($(`
      <div id="${id}" class="row time-block ${getTimePeriod(timeDiff)}">
        <div class="col-2 col-md-1 hour text-center py-3">${blockTime.format("h A")}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${textAreaVal}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `));
  }
}

// adds past (grey), present (red), and future (green) colors to time blocks
function getTimePeriod(timeDiff) {
  if (timeDiff > 0)
    return "future";
  else if (timeDiff < 0)
    return "past";
  else
    return "present";
}

// save button click event handler
function onSaveBtnClick() {

  // get id of time block
  var timeBlockID = $(this).parent().attr("id");

  // get string from text area
  var textAreaVal = $(this).siblings(".description").val();

  // save contents to localStorage
  localStorage.setItem(timeBlockID, JSON.stringify(textAreaVal));
}

// time blocks event listener with event delegation
timeBlocksDiv.on("click", ".saveBtn", onSaveBtnClick);
