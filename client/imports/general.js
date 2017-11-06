export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const setEditorValue = (id, text) => {
  if(!CKEDITOR.instances[id]) return ;

  CKEDITOR.instances[id].setData(text);
}

export const getEditorValue = (id) => {
  if(!CKEDITOR.instances[id]) return 'not found';

  return CKEDITOR.instances[id].getData();
}

export const createPositionCompareFunction = (positionName, nameName) => {
  return (a, b) => {
    if(a[positionName] && b[positionName]) {
      return parseInt(a[positionName]) > parseInt(b[positionName]) ? 1 : -1;
    }
    else if(a[positionName]) {
      return 1;
    }
    else if(b[positionName]) {
      return 1;
    }
    else if(nameName === 'date') {
      return a[nameName] < b[nameName] ? 1 : -1;
    }
    else {
      return a[nameName] > b[nameName] ? 1 : -1;
    }
  }
}

export const mfFileTolink = file => {
  return `/photodocs/${file._collectionName}/${file._id}/original/${file._id}.${file.extension}`;
}

export const mfIdToLink = (_id, ext) => {
  return `/photodocs/DocsCollection/${_id}/original/${_id}.${ext}`;
}

export const mfLinkToId = link => {
  return link.split('/')[3];
}

export const mfUploadFile = (file, DocsCollection, callback) => {
  const upload = DocsCollection.insert({
    file: file
  }, false);

  upload.on('end', (error, mfFile) => {
    if(error) {
      console.log(`upload error: ${error}`);
    }
    else {
      callback(mfFileTolink(mfFile));
    }
  });

  upload.start();
}

export const mfUploadFileAndThumbnail = (file, DocsCollection, callback) => {
  const fileImg = new Image();

  fileImg.src = URL.createObjectURL(file);

  fileImg.onload = () => {
    const imageUpload = DocsCollection.insert({
      file: file
    }, false);

    imageUpload.on('end', (error, mfImage) => {
      if(error) {
        console.log(`upload error: ${error}`);
      }
      else {
        const imageLink = mfFileTolink(mfImage);

        callback(imageLink);
      }
    })

    imageUpload.start();
  }
}

export const dataURLtoBlob = ( dataUrl, callback ) => {
  var req = new XMLHttpRequest;

  req.open( 'GET', dataUrl );
  req.responseType = 'arraybuffer'; // Can't use blob directly because of https://crbug.com/412752

  req.onload = function fileLoaded(e)
  {
      // If you require the blob to have correct mime type
      var mime = this.getResponseHeader('content-type');

      callback( new Blob([this.response], {type:mime}) );
  };

  req.send();
}

export const fileToBinaryString = (file, callback) => {
  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  }

  reader.readAsBinaryString(file);
}

export const filesToBinaryStrings = (files, callback) => {
  const arrayOfBinaryStrings = [];
  let countDown = files.length;

  Array.prototype.forEach.call(files, file => {
    fileToBinaryString(file, binaryString => {
      arrayOfBinaryStrings.push(binaryString);
      countDown --;

      if(countDown === 0) {
        callback(arrayOfBinaryStrings);
      }
    });
  });
}

export const transliterate = word => {
    let answer = "";
    const a = {
      "Ё": "YO",
      "Й": "I",
      "Ц": "TS",
      "У": "U",
      "К": "K",
      "Е": "E",
      "Н": "N",
      "Г": "G",
      "Ш": "SH",
      "Щ": "SCH",
      "З": "Z",
      "Х": "H",
      "Ъ": "'",
      "ё": "yo",
      "й": "i",
      "ц": "ts",
      "у": "u",
      "к": "k",
      "е": "e",
      "н": "n",
      "г": "g",
      "ш": "sh",
      "щ": "sch",
      "з": "z",
      "х": "h",
      "ъ": "'",
      "Ф": "F",
      "Ы": "I",
      "В": "V",
      "А": "a",
      "П": "P",
      "Р": "R",
      "О": "O",
      "Л": "L",
      "Д": "D",
      "Ж": "ZH",
      "Э": "E",
      "ф": "f",
      "ы": "i",
      "в": "v",
      "а": "a",
      "п": "p",
      "р": "r",
      "о": "o",
      "л": "l",
      "д": "d",
      "ж": "zh",
      "э": "e",
      "Я": "Ya",
      "Ч": "CH",
      "С": "S",
      "М": "M",
      "И": "I",
      "Т": "T",
      "Ь": "'",
      "Б": "B",
      "Ю": "YU",
      "я": "ya",
      "ч": "ch",
      "с": "s",
      "м": "m",
      "и": "i",
      "т": "t",
      "ь": "'",
      "б": "b",
      "ю": "yu",
      " ": "_",
    };



   for (i in word){
     if (word.hasOwnProperty(i)) {
       if (a[word[i]] === undefined){
         answer += word[i];
       } else {
         answer += a[word[i]];
       }
     }
   }
   return answer;
}
