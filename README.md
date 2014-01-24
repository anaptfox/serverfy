Serverfy
=================

Turns a static html site to a node application.

## Installing
    $ npm install -g serverfy

## Usage
    $ serverfy

    --version                print serverfy version and exit

## Example
```
git clone git@github.com:angular/angular-seed.git
Cloning into 'angular-seed'...
remote: Reusing existing pack: 1942, done.
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 1945 (delta 0), reused 3 (delta 0)
Receiving objects: 100% (1945/1945), 9.07 MiB | 400.00 KiB/s, done.
Resolving deltas: 100% (1072/1072), done.
Checking connectivity... done

mkdir angular-seed-server

cd angular-seed-server

serverfy
[?] Where is the base directory? (/Users/Me/Projects/angular-seed/app)

[?] Which files/directorys do you want to skip? No

Moving public files to /Users/taronfoxworth/Projects/angular-seed/app/public
Cleaning up old files
Attaching Node
Installing npm modules...
Installation done!
Please run "npm start" to start application


npm start

> serverfy@0.0.0 start /Users/taronfoxworth/Projects/angular-seed-server
> node index.js

Listening at  http://localhost:8080
```


## Support
If you have any issues, throw an issue in Github -
[https://github.com/taronfoxworth/serverfy/issues](https://github.com/taronfoxworth/serverfy/issues)



