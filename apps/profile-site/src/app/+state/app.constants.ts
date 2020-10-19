// variables

export const OPEN_WEATHER_URL =
  'https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&dt=1600041600&appid=';
export const DAYS_OF_THE_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const weatherDataRefreshTime = 6;

// functions 
export const kelvinToFahrenheit = (k) => {
  return ((k - 273.15) * 9) / 5 + 32;
};

export const formatData = (data) => {
  return data.map((datum) => {
    const splitDate = datum.formattedTime.split(' ');
    const singleLetterDayLabel = splitDate[0].split('')[0];
    const dayOfTheMonth = splitDate[1].split('/')[1];
    return {
      ...datum,
      dt: `${singleLetterDayLabel} - ${dayOfTheMonth}`,
    };
  });
};

export const niceDomain = (data) => {
  const niceDomains = [];
  data.forEach((val, i) => {
    let roundedVal;
    // create top and bottom range 
    if (i === data.length - 1) {
      roundedVal = Math.floor(val)
    } else {
      roundedVal = Math.ceil(val)
    }
    // don't push duplicate values
    if (niceDomains.indexOf(roundedVal) < 0) {
      niceDomains.push(roundedVal);
    }
  }); 
  return niceDomains;
};

export const wrapD3Text = (text, width, d3) => {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
      tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}