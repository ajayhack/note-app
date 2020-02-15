import React from 'react';

const startDay = new Date();
const endDay = new Date();
const x = ""
const y = ""

export default class Utils extends React.Component{

//Below method is to getCustom Start Date based on selected filter:-
getFilterBasedDates(filterStatus){
    switch(filterStatus){

      case 0:{
        return{
            x : startDay.getFullYear() + '-' + (startDay.getMonth() + 1) + '-' + startDay.getDate(),
            y : endDay.getFullYear() + '-' + (endDay.getMonth() + 1) + '-' + endDay.getDate(),
          };
      }

      case 1:{
        endDay.setDate((endDay.getDate()-1))
        return{
          x : endDay.getFullYear() + '-' + (endDay.getMonth() + 1) + '-' + endDay.getDate(),
          y : startDay.getFullYear() + '-' + (startDay.getMonth() + 1) + '-' + startDay.getDate(),
        };
      }
    
      case 2:{
        endDay.setDate((endDay.getDate()-7))
        return{
          x : endDay.getFullYear() + '-' + (endDay.getMonth() + 1) + '-' + endDay.getDate(),
          y : startDay.getFullYear() + '-' + (startDay.getMonth() + 1) + '-' + startDay.getDate(),
        };
      }
    
      case 3:{
        endDay.setDate((endDay.getDate()-30))
        return{
          x : endDay.getFullYear() + '-' + (endDay.getMonth() + 1) + '-' +  endDay.getDate(),
          y : startDay.getFullYear() + '-' + (startDay.getMonth() + 1) + '-' + (startDay.getDate()),
        };
      }

      default:{
        return{
            x : null,
            y : null,
          };
      }
    }
    }
}