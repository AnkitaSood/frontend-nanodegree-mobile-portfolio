## Website Performance Optimization Portfolio Project

The portfolio in this repo was optimized for speed and performance. The PageSpeed Insights score of the portfolio homepage > 92
 for both desktop and mobile. The pizza.html page runs at 60fps.
 

### Testing the performance

####Part 1: Optimize PageSpeed Insights score for index.html

#####Follow these steps to verify the performance scores:

1. Download the repository
2. Go to dist folder and run a server using the command line. Make sure [python](https://www.python.org/downloads/) is installed.
  ``` bash
  
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```
  OR 
  ``` bash
  
  $> python -m http.server <port> - for Python 3.x
    ```
3. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/dist-project-folder
  $> ngrok http 8080
  ```
4. Copy the public URL ngrok gives you and run it through PageSpeed Insights! 
5. Keep Calm & Be awed \m/

##### HOW THE RESULT WAS ACHIEVED:

- Added print media attribute to defer print styles until necessary.
- Loaded fonts via JS.
- Marked JS files not being used to deliver primary content as async.
- Compressed images.
- Minified and compressed CSS, JS and HTML files - using Gulp tasks.
- Used gulp's [critical](https://www.npmjs.com/package/critical) to inline the most immediately-used CSS [critical render blocking CSS]
- Resized the pizzeria image.

####Part 2: Optimize Frames per Second in pizza.html

#####Follow these steps to verify the performance scores:

  1. Go to the dist/ folder and open pizza.html in a browser (preferably in incognito mode - with no other tasks/tabs running).
  2. Open the web developer tools and record the timeline while interacting with the page.
  3. Stop the recording and observe the timelines/ frame graphs.
  OR
  1. Open the pizza.html in Chrome Canary, and open the developer tools.
  2. Go to the timeline section and select 'Show FPS meter' option under the Rendering tab.
  3. Interact the page and observe the FPS meter.

##### HOW THE RESULT WAS ACHIEVED:
  - Cached all DOM element references, which were being manipulated for faster processing.
  - Replaced querySelectorAll() and document.querySelector() with getELementById() and getElementsByClassName().
  - Moved code out of for loops which didn't have to be run for all the loops.
  - Replaced animation effect of shifting left positioning by css transition effect. Used CSS hardware-acceleration by using transform     property on the moving pizzas.
  - Reduced the number of background pizzas be displayed on page load at once according to the available screenheight.
  - Minimized the JS, CSS, HTML and images using gulp tasks.
  - Removed duplicacy of switch cases while resizing pizzas and refactored the code for the same.

All these changes resuled in loading the pizzas on initial load faster. The average time per 10 frames ( close to < 1ms each time) and the time to resize pizzas ( < 5ms) also dropped significantly .


