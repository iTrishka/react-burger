import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale  from 'dayjs/plugin/updateLocale';


//получить дату заказа

export const getDataOrder = (data:string) => {
    dayjs.extend(updateLocale)
    dayjs.updateLocale('en', {
    relativeTime: {
        future: "через %s",
        past: "%s назад",
        s: 'Сегодня',
        m: "Сегодня",
        mm: "Сегодня",
        h: "Сегодня",
        hh: "Сегодня",
        d: "Вчера",
        dd: `{dd} дня(ей) назад`,
        M: "месяц назад",
        MM: "%d месяцев назад",
        y: "год назад",
        yy: "%d года(лет) назад"
    }
    })
    dayjs.extend(relativeTime)
    const dataTime = dayjs(data).format(", HH:mm"+" i-GMT+3")
    const dataDAy = dayjs(data).fromNow(true)
    return dataDAy+dataTime

}


//Троеточие в названии, если очень длинное слово

export const setShortName = (name: string) => {
    if(name.length > 60){
        return name.substring(0, 60) + "..."
    }else return name
}
