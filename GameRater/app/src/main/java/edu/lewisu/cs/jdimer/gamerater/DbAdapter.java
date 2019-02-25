package edu.lewisu.cs.jdimer.gamerater;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Created by thein on 4/19/2018.
 */

public class DbAdapter {
    private static final String DATABASE_NAME = "data.db";
    private static final String DATABASE_TABLE = "games";
    private static final int DATABASE_VERSION = 2;

    public static final String KEY_ROWID = "_id";
    public static final String TITLE_NAME = "title";
    public static final String EVAL_NAME = "comment";
    public static final String GENRE_NAME = "genre";
    public static final String RATING_NAME = "rating";

    private static final String[] allCols = new String[] {KEY_ROWID, TITLE_NAME, EVAL_NAME,
            GENRE_NAME, RATING_NAME };

    private static final String DATABASE_CREATE =
            "create table " +
                    DATABASE_TABLE +" (" +
                    KEY_ROWID + " integer primary key autoincrement, " +
                    TITLE_NAME +  " text not null, " +
                    EVAL_NAME + " text, " +
                    GENRE_NAME + " text not null, " +
                    RATING_NAME + " real"+ ");";

    private DatabaseHelper mDbHelper;
    private SQLiteDatabase mDb;

    private final Context mCtx;

    public DbAdapter(Context ctx) {
        this.mCtx = ctx;  //set context
    }

    public void open() throws SQLException {  //open db, if fail throw an exception
        mDbHelper = new DatabaseHelper(mCtx);
        mDb = mDbHelper.getWritableDatabase();
    }

    public void close() {
        mDbHelper.close();
    }


    public long createRating(String title, String eval, String genre, float rating) {
        ContentValues initialValues = new ContentValues();
        initialValues.put(TITLE_NAME,  title);
        initialValues.put(EVAL_NAME, eval);
        initialValues.put(GENRE_NAME, genre);
        initialValues.put(RATING_NAME, rating);

        return mDb.insert(DATABASE_TABLE, null, initialValues);
    }

    public boolean deleteRating(long rowId) {

        return mDb.delete(DATABASE_TABLE, KEY_ROWID + "=" + rowId, null) > 0;
    }

    public Cursor fetchAllRatings() {
        return mDb.query(DATABASE_TABLE, allCols , null, null, null, null, null);
    }


    public Cursor fetchRating(long rowId) throws SQLException {

        Cursor mCursor =

                mDb.query(DATABASE_TABLE, allCols, KEY_ROWID + "=" + rowId, null,
                        null, null, null, null);
        if (mCursor != null) {
            mCursor.moveToFirst();
        }
        return mCursor;

    }


    public boolean updateRating(long rowId, String title, String eval, String genre, float rating) {
        ContentValues args = new ContentValues();
        args.put(TITLE_NAME,  title);
        args.put(EVAL_NAME, eval);
        args.put(GENRE_NAME, genre);
        args.put(RATING_NAME, rating);

        return mDb.update(DATABASE_TABLE, args, KEY_ROWID + "=" + rowId, null) > 0;
    }


    private static class DatabaseHelper extends SQLiteOpenHelper {

        DatabaseHelper(Context context) {
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(DATABASE_CREATE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            Log.w("DatabaseHelper", "Upgrading database from version " + oldVersion + " to "
                    + newVersion + ", which will destroy all old data");
            db.execSQL("DROP TABLE IF EXISTS notes");
            onCreate(db);
        }
    }

}
