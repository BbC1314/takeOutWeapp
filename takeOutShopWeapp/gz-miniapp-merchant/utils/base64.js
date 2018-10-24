/**
 * @description 对数据进行base64编码
 */
export function Base64 () {
  // private property
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  // public method for encoding
  this.encode = function (input) {
    let output = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0
    input = utf8Encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  }

  // public method for decoding
  this.decode = function (input) {
    let output = ''
    let chr1, chr2, chr3
    let enc1, enc2, enc3, enc4
    let i = 0
    input = input.replace(/[^A-Za-z0-9]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = utf8Decode(output)
    return output
  }

  // private method for UTF-8 encoding
  function utf8Encode (string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }

  // private method for UTF-8 decoding
  function utf8Decode (utftext) {
    let string = ''
    let i = 0
    let c = 0
    let c2 = 0
    let c3 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}
/**
 * @description 对数据进行base64解码，并utf-8 to utf-16
 */
export function base64DecodeToUtf16 (str) {
  if (str === '' || str === null) {
    return ''
  }
  return utf8to16(base64decode(str))
  function base64decode (str) {
    const base64DecodeChars = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]

    let c1, c2, c3, c4
    let i, out

    const len = str.length
    i = 0
    out = ''
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c1 === -1)
      if (c1 === -1) { break }

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c2 === -1)
      if (c2 === -1) { break }

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff
        if (c3 === 61) { return out }
        c3 = base64DecodeChars[c3]
      } while (i < len && c3 === -1)
      if (c3 === -1) { break }

      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2))

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff
        if (c4 === 61) { return out }
        c4 = base64DecodeChars[c4]
      } while (i < len && c4 === -1)
      if (c4 === -1) { break }
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
  }

  function utf8to16 (str) {
    let out, i, c
    let char2, char3

    out = ''
    const len = str.length
    i = 0
    while (i < len) {
      c = str.charCodeAt(i++)
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
          out += str.charAt(i - 1)
          break
        case 12: case 13:
        // 110x xxxx   10xx xxxx
          char2 = str.charCodeAt(i++)
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
          break
        case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++)
          char3 = str.charCodeAt(i++)
          out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0))
          break
      }
    }
    return out
  }
}
