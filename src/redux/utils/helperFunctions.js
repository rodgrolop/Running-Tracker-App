export const distance = fecNac => {
    let year = fecNac.split('-')[0]
    switch (year) {
      case ('2007' || '2008'): {
          return 800
      }
      case ('2009' || '2010'): {
          return 600
      }
      case ('2011' || '2012' || '2013' || '2014'): {
        return 400
      }
      case ('2015' || '2016'): {
        return 200
      }
      default: {
          return 6500
      }
    }
  }