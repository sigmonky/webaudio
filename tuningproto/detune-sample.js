/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var DetuneSample = function() {
  loadSounds(this,{
    p0: 'middle-c.mp3',
    p100:'middle-cs.mp3',
    p200:'middle-d.mp3'
  }); 
};



DetuneSample.prototype.play = function(ratio) {
  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2;

  //play two tones simultaneously -- the root and a chosen interval
  for (var bar = 0; bar < 1; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    
    // Play 1/1
    playSound(this["p0"], time, 0);
    var cents = 1200*Math.log(ratio)/Math.log(2);
    
    var refTone = cents/100;
    console.log("cents for " + ratio + " = " + cents + " reftone = " + refTone);
    var detuning = 0;
    if ( (cents%100) < 50 ) {
      refTone = Math.floor(refTone) * 100;
      detuning = cents - refTone;
    } else {
      refTone = Math.ceil(refTone) * 100;
      detuning = (refTone - cents ) * -1;
    }
    var refKey = "p" + refTone;

    console.log("ref tone " + refTone +  " detuned by " + detuning);
    playSound(this[refKey], time,detuning);

  }
};
