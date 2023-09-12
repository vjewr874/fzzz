export function getGameK3Types(intl) {
  return [
    {
      value: "K31",
      label: intl.formatMessage({ id: "minutes" }, { val: 1 })
    },
    {
      value: "K33",
      label: intl.formatMessage({ id: "minutes" }, { val: 3 })
    },
    {
      value: "K35",
      label: intl.formatMessage({ id: "minutes" }, { val: 5 })
    },
    {
      value: "K310",
      label: intl.formatMessage({ id: "minutes" }, { val: 10 })
    }
  ]
}

export function getGameWinGoTypes(intl) {
  return [
    {
      value: "WINGO1",
      label: intl.formatMessage({ id: "minutes" }, { val: 1 })
    },
    {
      value: "WINGO3",
      label: intl.formatMessage({ id: "minutes" }, { val: 3 })
    },
    {
      value: "WINGO5",
      label: intl.formatMessage({ id: "minutes" }, { val: 5 })
    },
    {
      value: "WINGO10",
      label: intl.formatMessage({ id: "minutes" }, { val: 10 })
    }
  ]
}

export function getGame5DType(intl) {
  return [
    {
      value: "5D1",
      label: intl.formatMessage({ id: "minutes" }, { val: 1 })
    },
    {
      value: "5D3",
      label: intl.formatMessage({ id: "minutes" }, { val: 3 })
    },
    {
      value: "5D5",
      label: intl.formatMessage({ id: "minutes" }, { val: 5 })
    },
    {
      value: "5D10",
      label: intl.formatMessage({ id: "minutes" }, { val: 10 })
    }
  ]
}