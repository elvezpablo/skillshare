# React & Express in Typescript

Project uses snowpack and esbuild for bundling of file and expressjs for the server. All code is Typscript. 



## Development Plan

- [x] Read requirements
- [x] Re-read requirements
- [x] Reacquaint with dev environment (update packages, run scripts, imports dependencies)
- [x] Make API endpoints
  - [x] POST link
    - [x] generate id
    - [x] save to store
    - [x] return short url
  - [x] GET link resolve
- [X] Layout front end UI
- [X] Connect state logic
- [X] Connect front to back
- [ ] Unit test back end functions
- [X] Modularize components
- [X] Style components
- [X] Check for accessibility 
- [X] Post on github
- [X] Email to skillshare

### Stretch Goals
 
- [ ] Add tracking

## Running

`yarn dev`


## API Documentation 

POST `/v1/link`

### Parameters

* _url_: URL string to transform (required)
* _urls_: Array of URL strings (optional)

GET `/v1//:id([0-9a-f]{7})`

* _string_: accepts a 7 digit string as a short slug






