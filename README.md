# Untitled by Kozak

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|11/20| Project Description | Complete
|11/20| Wireframes / Priority Matrix / Functional Components | Incomplete
|11/22| Motion Tracking | Incomplete
|11/23| PWM CRUD Deployment/Testing | Incomplete
|11/24| Hardware | Incomplete
|11/25| Lock Features | Incomplete
|12/2| MVP | Incomplete
|12/3| Pretty In CSS | Incomplete
|12/4| Present | Incomplete


## Project Description

Untitled is a fun and versatile tool for musicians. Create sounds using a plethora of unique interfaces, including a motion-capture theremin. Record and sequence samples, stack loops with real-time toggle playback, extract in-depth analytical data from any audio source. Save your projects and settings to the server. Untitled truly does it all! Call within the next fifteen minutes and we'll double your order. That's two Untitled's for the price of one (just pay separate processing and handling).

## Wireframes

###Screenshot:
![screenshot](https://res.cloudinary.com/dlqbbkr8b/image/upload/v1542731671/project4/screenshot.png)

###Theremin:
![theremin](https://res.cloudinary.com/dlqbbkr8b/image/upload/v1542731557/project4/theremin.png)

###Analyser Modules:
![analyser_modules](https://res.cloudinary.com/dlqbbkr8b/image/upload/v1542731557/project4/analyser_modules.png)

## Priority Matrix

![matrix](https://res.cloudinary.com/dlqbbkr8b/image/upload/v1539696617/project2/06mvp.jpg)

## MVP/PostMVP

#### MVP 

- Motion Capture Theremin
- Keyboard Piano / Synth
- Sample Sequencer + Recorder
- In-depth Audio Analysis Toolkit (spectrograph, waveform, etc.)
- Pitch Identifier / Tuner
- User Auth / Account Creation

#### PostMVP 

- Additional Instrument Modules (Drums, Chaos, 808, Moog, etc.)
- Effects Modules (Limiter, Compressor, EQ, LFO, Gate, etc.)
- Generational Bouncing + Download functionality

## React Architectural Design

![react](https://res.cloudinary.com/dlqbbkr8b/image/upload/a_exif/v1542731752/project4/React.jpg)

## ERD

![ERD](https://res.cloudinary.com/dlqbbkr8b/image/upload/a_exif/v1542731751/project4/ERD.jpg)

## Functional Components

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| User Auth + Server | Critical | 2h | 0h | n/a |
| PWM CRUD | Critical | 10h | 0h | n/a |
| Analyser Modules | Critical | 20h | 9h | n/a |
| Theremin | High | 15h | 3h | n/a |
| Piano/Synth | High | 10h | 0h | n/a |
| React Refactors | Inevitable | 12h | 1h | n/a |
| Pretty CSS | Meh | 8h | 0h | n/a |
| Total | Important | 77h | 13h | n/a |

## Helper Functions

| Function | Description | 
| --- | :---: |  
| makeDomain | Returns array of scaled values from d3.extent to pass to d3.domain in order to match an arbitrary-length array in d3.range. Used primarily for mapping a dataset to a color scale with an arbitrary number of entries |
| getNote | Returns a musical note (string) based on input of Hz (integer) |

## Additional Libraries
D3.js, Tone.js, tracking.js

## Code Snippet
None.

## Change Log
N/A.

## Issues and Resolutions
None.