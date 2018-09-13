package com.yzb;
import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.Context;
import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;
import	com.facebook.react.bridge.ReactApplicationContext;
import	com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
public	class	DownloadApk	extends ReactContextBaseJavaModule{

    DownloadManager downManager ;
    Activity myActivity;

    public DownloadApk(ReactApplicationContext	reactContext)	{
        super(reactContext);
    }

    @Override

    public String getName(){
        return	"DownloadApk";
    }

    @ReactMethod

    public void downloading(String url, String description){

        myActivity =getCurrentActivity();
        downManager = (DownloadManager)myActivity.getSystemService(Context.DOWNLOAD_SERVICE);
        Uri uri = Uri.parse(url);

        DownloadManager.Request request = new Request(uri);

        //仅WIFI环境下载
        //request.setAllowedNetworkTypes(Request.NETWORK_WIFI);

        //设置通知栏标题

        request.setNotificationVisibility(Request.VISIBILITY_VISIBLE);

        request.setMimeType("application/vnd.android.package-archive");

        request.setTitle("下载养殖宝更新");

        if(description == null || "".equals(description)) {
            description = "目标apk正在下载";
        }

        request.setDescription(description);
        request.setAllowedOverRoaming(false);

        //设置文件存放目录
        request.setDestinationInExternalFilesDir(myActivity, Environment.DIRECTORY_DOWNLOADS, description);

        long download_id = downManager.enqueue(request);

        SharedPreferences sPreferences = myActivity.getSharedPreferences("yzb_download", 0);
        sPreferences.edit().putLong("yzb_download_apk", download_id).commit();
    }
}
