var vshader_source =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    'gl_Position=a_Position;\n' +
    'gl_PointSize=a_PointSize;\n' +
    '}\n';

var fshader_source =
      'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main(){\n' +
    'gl_FragColor=u_FragColor;' +
    '}\n';

function main()
{
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl)
    {
        console.log("failed to get gl");
        return;
    }
    if(!initShaders(gl, vshader_source, fshader_source))
    {
        console.log("failed to init shader");
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0)
    {
        console.log("failed to get location a_position");
        return;
    }
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log("failed to get location a_pointsize");
        return;
    }
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log("failed to get location u_FragColor");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.onmousedown=function(e)
    {
        click(e,a_Position, a_PointSize, u_FragColor, gl, canvas);
    }






}
var g_point=[];
var g_color=[];
function click(e,a_Position, a_PointSize, u_FragColor, gl, canvas) {
    var rect=e.target.getBoundingClientRect();
    var x = e.x - rect.left;
    var y = e.y - rect.top;
    x = (x - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - y) / (canvas.width / 2);
    g_point.push([x, y]);
    if (x >= 0)
    {
        if(y >= 0)
        {
            g_color.push([1.0, 0.0, 0.0, 1.0]);
        }else
        {
            g_color.push([0.0, 1.0, 0.0, 1.0]);
        }

    }
    else
    {
        if(y >= 0)
        {
            g_color.push([0.0, 0.0, 1.0, 1.0]);
        }else
        {
            g_color.push([0.0, 0.5, 0.5, 1.0]);
        }
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    for(var i=0;i<g_point.length;i++)
    {
        gl.vertexAttrib3f(a_Position, g_point[i][0], g_point[i][1],  1.0);
        gl.vertexAttrib1f(a_PointSize, 5.0);
        gl.uniform4f(u_FragColor,g_color[i][0], g_color[i][1], g_color[i][2], g_color[i][3]);

       
        gl.drawArrays(gl.g_point, 0, 1);
    }
    

}
 