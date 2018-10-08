// helper function
const formatSongName = require('./formatSongName');

module.exports = function(body, station){
   const regex = /<body>(.*?)<\/body>/i;
   const match = regex.exec(body);  
   let data = match[1].split(',');

   // all but the last should be numbers
   for (var i = 0; i < data.length; i++) {
      if (i === 6) {
         if(!data[i]){
            data[i] = "[no data]"
         } else {
            data[i] = formatSongName(data[i])
         }
      } else {
         data[i] = parseInt(data[i], 10);
      }
   }

   return {
      station: station,
      current_listeners: data[0],
      current_song: data[6],
      stream_status: data[1],
      peak_listeners: data[2],
      max_listeners: data[3],
      unique_listeners: data[4],
      bitrate: data[5],
   }
}
