var load = function(t,h,o)
{
    var tempChart = echarts.init(document.getElementById('temp'));
    var humidityChart = echarts.init(document.getElementById('humidity'));
    var co2Chart = echarts.init(document.getElementById('co2'));
    var option_temp = {
        title: {
            show: false,
            subtext: ''
        },
        series: [{
            title: {
                show: false
            },
            name: '温度',
            type: 'gauge',
            splitNumber: 6,
            min: -10,
            max: 50,
            radius: '90%',  // 半径
            startAngle: 215,  //起始位置
            endAngle: -35,   //终点位置
            detail: {
                formatter: '{value}℃',
                offsetCenter: [0, 40],
                textStyle: {
                    fontSize: 16,
                    color: '#000'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 10,
                    shadowBlur: 0,
                    color: [[0.38, '#9CD6CE'], [0.65, '#7CBB55'], [0.8, '#E98E2C'], [1, '#E43F3D']]
                }
            },
            splitLine: {
                length: 10,
            },
            axisTick: {
                length: 5
            },
            axisLabel: {
                fontSize: 10,
                fontWeight: 100,
            },
            data: [{
                value: 33.2,
                name: '当前温度'
            }]
        }]
    };
    var option_humidity = {
        title: {
            show: false,
            subtext: ''
        },
        series: [{
            title: {
                show: false
            },
            type: 'gauge',
            splitNumber: 7,
            min: 30,
            max: 100,
            radius: '90%',  // 半径
            startAngle: 215,  //起始位置
            endAngle: -35,   //终点位置
            detail: {
                formatter: '{value}%rh',
                offsetCenter: [0, 40],
                textStyle: {
                    fontSize: 16,
                    color: '#000'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 10,
                    shadowBlur: 0,
                    color: [[0.3, '#9CD6CE'], [0.6, '#7CBB55'], [0.8, '#E98E2C'], [1, '#E43F3D']]
                }
            },
            splitLine: {
                length: 10,
            },
            axisTick: {
                length: 5
            },
            axisLabel: {
                fontSize: 10,
                fontWeight: 100,
            },
            data: [{
                value: 63.2,
                name: '湿度'
            }]
        }]
    };
    var option_co2 = {
        title: {
            show: false,
            subtext: ''
        },
        series: [{
            title: {
                show: false
            },
            type: 'gauge',
            splitNumber: 4,
            min: 0.05,
            max: 0.15,
            radius: '90%',  // 半径
            startAngle: 215,  //起始位置
            endAngle: -35,   //终点位置
            detail: {
                formatter: '{value}%',
                offsetCenter: [0, 40],
                textStyle: {
                    fontSize: 16,
                    color: '#000'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 10,
                    shadowBlur: 0,
                    color: [[0.2, '#9CD6CE'], [0.7, '#7CBB55'], [0.9, '#E98E2C'], [1, '#E43F3D']]
                }
            },
            splitLine: {
                length: 10,
            },
            axisTick: {
                length: 5
            },
            axisLabel: {
                fontSize: 10,
                fontWeight: 100,
            },
            data: [{
                value: 0.08,
                name: '二氧化碳'
            }]
        }]
    };

    option_temp.series[0].data[0].value = t.toFixed(1);
    tempChart.setOption(option_temp, true);

    option_humidity.series[0].data[0].value = h.toFixed(1);
    humidityChart.setOption(option_humidity, true);

    option_co2.series[0].data[0].value = o.toFixed(3);
    co2Chart.setOption(option_co2, true);

    tempChart.setOption(option_temp);
    humidityChart.setOption(option_humidity);
    co2Chart.setOption(option_co2);
};


var getQueryStringByName=function(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var toNumber=function(value,defaultValue){
    if(!value || value==""){
        return defaultValue;
    }
    var _t = parseFloat(value,10);
    if( isNaN(_t) ){
        return defaultValue;
    }
    return _t;
}
var interval = setInterval(function () {
    if(document.readyState === "complete"){
        try{
            var t = toNumber(getQueryStringByName("t"),0);//温度
            var h = toNumber(getQueryStringByName("h"),0);//湿度
            var o = toNumber(getQueryStringByName("o"),0);//二氧化碳

            load(t,h,o);
        }catch(e){
        }
        clearInterval(interval);
    }
},1000);