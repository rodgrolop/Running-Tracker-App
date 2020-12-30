export const distance = fecNac => {
    let year = fecNac.split('-')[0]    
    switch (year) {
      case '2007': {
          return 800
      }
      case '2008': {
          return 800
      }
      case '2009': {
          return 600
      }
      case '2010': {
          return 600
      }
      case '2011': {
        return 400
      }
      case '2012': {
        return 400
      }
      case '2013': {
        return 400
      }
      case '2014': {
        return 400
      }
      case '2015': {
        return 200
      }
      case '2016': {
        return 200
      }
      default: {
          return 6500
      }
    }
  }