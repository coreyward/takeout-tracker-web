import parseHours, { parseTimes, hoursCover } from "./parseHours"

describe("parseTimes", () => {
  test("single time, no minutes", () => {
    expect(parseTimes("11am")).toEqual([1100])
  })

  test("single time, with minutes", () => {
    expect(parseTimes("11:20am")).toEqual([1120])
  })

  test("implicit “am”", () => {
    expect(parseTimes("11:30")).toEqual([1130])
  })

  test("12-hour time with “pm”", () => {
    expect(parseTimes("11:30pm")).toEqual([2330])
  })

  test("multiple times", () => {
    expect(parseTimes("11am–3pm")).toEqual([1100, 1500])
    expect(parseTimes("11:20am–4:15pm")).toEqual([1120, 1615])
  })

  test("with spaces before am/pm", () => {
    expect(parseTimes("Thu-Sun: 12 PM - 6 PM")).toEqual([1200, 1800])
  })

  test("with single-char am/pm", () => {
    expect(parseTimes("Thu-Sun: 11a-4p")).toEqual([1100, 1600])
  })

  test("12:01am === 0001", () => {
    expect(parseTimes("12:01am")).toEqual([1])
  })

  test("12:01pm === 1201", () => {
    expect(parseTimes("12:01pm")).toEqual([1201])
  })

  test("Handle “noon”", () => {
    expect(parseTimes("Noon to 3:33pm")).toEqual([1200, 1533])
  })
})

describe("parseHours", () => {
  test("single day default", () => {
    expect(parseHours("Mon: 11am–8pm")).toEqual([
      { weekday: 1, startTime: 1100, endTime: 2000 },
    ])
  })

  test("single day, sloppy", () => {
    expect(parseHours("th- 6a to 8:33pm")).toEqual([
      { weekday: 4, startTime: 600, endTime: 2033 },
    ])
  })

  test("times crossing midnight", () => {
    expect(parseHours("friday 10pm–2am")).toEqual([
      { weekday: 5, startTime: 2200, endTime: 2400 },
      { weekday: 6, startTime: 0, endTime: 200 },
    ])
  })

  test("two day span", () => {
    expect(parseHours("Wed–Thurs: 5:55am–7pm")).toEqual([
      { weekday: 3, startTime: 555, endTime: 1900 },
      { weekday: 4, startTime: 555, endTime: 1900 },
    ])
  })

  test("two-day spans crossing midnight", () => {
    expect(parseHours("fri–sat 10pm–2am")).toEqual([
      { weekday: 0, startTime: 0, endTime: 200 },
      { weekday: 5, startTime: 2200, endTime: 2400 },
      { weekday: 6, startTime: 0, endTime: 200 },
      { weekday: 6, startTime: 2200, endTime: 2400 },
    ])
  })

  test("three day span, non-wrapping", () => {
    expect(parseHours("Wed–Fri: 5:55am–7pm")).toEqual([
      { weekday: 3, startTime: 555, endTime: 1900 },
      { weekday: 4, startTime: 555, endTime: 1900 },
      { weekday: 5, startTime: 555, endTime: 1900 },
    ])
  })

  test("three day span, weekend wrapping", () => {
    expect(parseHours("Fri–Sun: 4pm–5:30pm")).toEqual([
      { weekday: 0, startTime: 1600, endTime: 1730 },
      { weekday: 5, startTime: 1600, endTime: 1730 },
      { weekday: 6, startTime: 1600, endTime: 1730 },
    ])
  })

  test("multi-day span with label", () => {
    expect(parseHours("Dinner: Mon-Sun: 5pm–10pm")).toEqual([
      { weekday: 0, startTime: 1700, endTime: 2200 },
      { weekday: 1, startTime: 1700, endTime: 2200 },
      { weekday: 2, startTime: 1700, endTime: 2200 },
      { weekday: 3, startTime: 1700, endTime: 2200 },
      { weekday: 4, startTime: 1700, endTime: 2200 },
      { weekday: 5, startTime: 1700, endTime: 2200 },
      { weekday: 6, startTime: 1700, endTime: 2200 },
    ])
  })

  test("“everyday” with suffix", () => {
    expect(parseHours("Everyday 7am - 10pm at all locations")).toEqual([
      { weekday: 0, startTime: 700, endTime: 2200 },
      { weekday: 1, startTime: 700, endTime: 2200 },
      { weekday: 2, startTime: 700, endTime: 2200 },
      { weekday: 3, startTime: 700, endTime: 2200 },
      { weekday: 4, startTime: 700, endTime: 2200 },
      { weekday: 5, startTime: 700, endTime: 2200 },
      { weekday: 6, startTime: 700, endTime: 2200 },
    ])
  })

  test("11am until sold out", () => {
    expect(parseHours("11am until sold out")).toEqual([
      { weekday: 0, startTime: 1100, endTime: undefined },
      { weekday: 1, startTime: 1100, endTime: undefined },
      { weekday: 2, startTime: 1100, endTime: undefined },
      { weekday: 3, startTime: 1100, endTime: undefined },
      { weekday: 4, startTime: 1100, endTime: undefined },
      { weekday: 5, startTime: 1100, endTime: undefined },
      { weekday: 6, startTime: 1100, endTime: undefined },
    ])
  })

  test("garbage in, empty array out", () => {
    expect(parseHours("Check website")).toEqual([])
  })
})

describe("hoursCover", () => {
  const tuesdayAt3pm = new Date(2020, 2, 17, 15, 0, 0)
  const fridayAt10pm = new Date(2020, 2, 20, 22, 0, 0)
  const saturdayAt1am = new Date(2020, 2, 21, 1, 0, 0)

  test("positive for matching range", () => {
    expect(hoursCover(["Tuesday 8am–8pm"], tuesdayAt3pm)).toBeTruthy()
  })

  test("negative for non-matching range", () => {
    expect(hoursCover(["Tuesday 8pm–11pm"], tuesdayAt3pm)).toBeFalsy()
  })

  test("excludes other days of week", () => {
    expect(hoursCover(["Wednesday 8am–8pm"], tuesdayAt3pm)).toBeFalsy()
  })

  test("implicit every-day", () => {
    expect(hoursCover(["8am–8pm"], tuesdayAt3pm)).toBeTruthy()
  })

  test("range exclusion with implicit every-day", () => {
    expect(hoursCover(["8am–8pm"], fridayAt10pm)).toBeFalsy()
  })

  test("time range crossing midnight matches", () => {
    expect(hoursCover(["Mon 10pm–2am"], tuesdayAt3pm)).toBeFalsy()
    expect(hoursCover(["Friday 10pm–2am"], fridayAt10pm)).toBeTruthy()
    expect(hoursCover(["Friday 10pm–2am"], saturdayAt1am)).toBeTruthy()
  })

  test("negative for “closed”", () => {
    expect(hoursCover(["Sat: CLOSED"], saturdayAt1am)).toBeFalsy()
  })

  test("time ending at midnight", () => {
    expect(hoursCover(["9pm–12am"], fridayAt10pm)).toBeTruthy()
    expect(hoursCover(["9pm–12am"], saturdayAt1am)).toBeFalsy()
  })

  test("multiple hours ranges work", () => {
    const range = ["2pm–3:15pm", "11pm–2am"]

    expect(hoursCover(range, tuesdayAt3pm)).toBeTruthy()
    expect(hoursCover(range, fridayAt10pm)).toBeFalsy()
    expect(hoursCover(range, saturdayAt1am)).toBeTruthy()
  })

  test("exclusive of closing-at time", () => {
    expect(hoursCover(["1pm–3pm"], tuesdayAt3pm)).toBeFalsy()
  })

  test("empty array does not cover", () => {
    expect(hoursCover([], tuesdayAt3pm)).toBe(false)
  })
})
