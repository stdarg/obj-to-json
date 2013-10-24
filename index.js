'use strict';
var debug = require('debug')('obj-to-json');
var is = require('is2');

/**
 * A convenience function to copy an object. Must be an object that can be
 * serialized into JSON.
 * @param {Object} obj An object to be copied.
 * @param {Array|Str} delProps A string or an array of properties to delete.
 * @return {Object|Boolean} returns the object copy or false, if there was an
 *   error.
 * @private
 */
exports.copyObj = function copyObj(obj, delProps) {
  var newObj;
  try {
    newObj = JSON.parse(JSON.stringify(obj));
  } catch(err) {
    debug('copyObj error: '+err.message);
    return false;
  }

  // remove unwanted object properties.
  if (delProps) {
    if (is.str(delProps) && newObj[delProps]) {
      delete newObj[delProps];
    } else if (is.array(delProps)) {
      for (var i=0; i<delProps.length; i++) {
        delete newObj[i];
      }
    }
  }
  return newObj;
};

/**
 * A convenience function to convert a JSON string to an object.
 * @param {String} str A stringified JSON representation.
 * @return {Object|Boolean} returns the object representation of the JSON, if
 * the str representation is is legal and false otherwise.
 * @private
 */
exports.jsonStrToObj = function jsonStrToObj(str) {
  var obj;
  try {
    obj = JSON.parse(str);
  } catch(err) {
    debug('jsonStrToObj error: '+err.message);
    return false;
  }
  return obj;
};

/**
 * A convenience function to convert an object to a JSON string.
 * @param {Object} obj A javascript object than can be converted to JSON
 * @return {String|Boolean} The JSON string if possible and false otherwise.
 * @private
 */
exports.objToJsonStr = function objToJsonStr(obj) {
  var str;
  try {
    str = JSON.stringify(obj);
  } catch(err) {
    debug('objToJsonStr error: '+err.message);
    return false;
  }
  return str;
};

