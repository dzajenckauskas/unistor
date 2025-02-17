export function dateFormatConverter(d) {
    if (d) {
        if (d.includes(",")) {
            return d;
        } else {
            let split = d.split(" ");

            let date = `${split[0]}, ${split[2]} ${split[1]} ${split[3]}`;
            return date;
        }
    }
}
