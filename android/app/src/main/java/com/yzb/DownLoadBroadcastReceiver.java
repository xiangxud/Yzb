package com.yzb;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;
import java.io.File;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        long myDownloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);

        SharedPreferences sPreferences = context.getSharedPreferences("yzb_download", 0);

        long reference_ = sPreferences.getLong("yzb_download_apk", 0);

        if (reference_ == myDownloadID) {

            DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);

            Intent install = new Intent(Intent.ACTION_VIEW);

            //Uri downloadFileUri = dManager.getUriForDownloadedFile(myDownloadID);

            DownloadManager.Query queryById = new DownloadManager.Query();

            queryById.setFilterById(myDownloadID);

            Cursor myDownload = dManager.query(queryById);

            String download_name = null;

            if (myDownload.moveToFirst()) {

                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));

                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    // process download
                    int fileNameIdx = myDownload.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);
                    //此处取得的是完整路径+文件名称
                    download_name = myDownload.getString(fileNameIdx);
                } else {
                    Toast.makeText(context,"下载失败，已删除残留文件", Toast.LENGTH_LONG).show();
                    dManager.remove(myDownloadID);
                    myDownload.close();
                    return;
                }

                myDownload.close();
            }

            if(download_name == null){
                return;
            }

            File file = new File(download_name);

            install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
            install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            context.getApplicationContext().startActivity(install);
        }
    }
}
