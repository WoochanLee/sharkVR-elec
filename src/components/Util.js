class Util {
  static checkNum(sec){
    if(Math.abs(sec)<=9){
      return '0'+Math.abs(sec);
    }else{
      return ''+Math.abs(sec);
    }
  }

  static minToSec(min){
    return min*60;
  }

  static secToHour(sec){
    return this.checkNum(parseInt(sec/3600));
  }

  static secToMin(sec){
    return this.checkNum(parseInt((sec%3600)/60));
  }

  static secToSec(sec){
    return this.checkNum(sec%60);
  }
}

export default Util;