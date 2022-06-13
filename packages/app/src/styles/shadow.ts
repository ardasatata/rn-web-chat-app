const shadow = {
  shallow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.41,
    elevation: 0.15,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  deep: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  // * designer guideline for shadow
  // * naming convention slightly changed to match its context
  // weak == small
  weak: {
    shadowColor: "rgba(151, 151, 151, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,

    elevation: 2,
  },
  regular: {
    shadowColor: "rgba(82, 82, 82, 0.15)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 6,
    shadowOpacity: 1,

    elevation: 6,
  },
}

export default shadow
