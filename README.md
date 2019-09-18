# dvr163
Open-source web interface for Eseenet/dvr163 NVR 
http://help.dvr163.com/index.php

The NVR comes stock with a built-in web server for viewing the camera feeds but it is Flash based and thus not mobile friendly. This provides a mobile-friendly means for accessing the cameras. Note: There is no known documentation for the NVR's API so the routes and args (consumed in nvrService.ts) have all been discovered using the Network tab in devtools. 

https://community.home-assistant.io/t/support-for-security-camera-system-via-nvr-eseecloud-dvr163/

## Docker

### Build and run
```
sudo docker build -t dvr163 .
sudo ./scripts/docker-run.sh
```

### Enable autostart on boot
```
sudo ./scripts/install-autostart.sh
```

### Logs
```
sudo docker logs -f dvr163
```

## Client-Code Development

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
