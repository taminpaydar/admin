export default function changeUrl(text:any){
    var regex = '/';
    text=text.replaceAll(regex, '-')
     regex = ' ';
     text=text.replaceAll(regex, '-')
     regex = '?';
     text=text.replaceAll(regex, '-')
     regex = '__';
     text=text.replaceAll(regex, '-')
     regex = '!';
     text=text.replaceAll(regex, '-')
     regex = '=';
     text=text.replaceAll(regex, '-')
     regex = '\\';
     text=text.replaceAll(regex, '-')
     regex = '&';
     text=text.replaceAll(regex, '-')
     regex = '#';
     text=text.replaceAll(regex, '-')

    return text;
}