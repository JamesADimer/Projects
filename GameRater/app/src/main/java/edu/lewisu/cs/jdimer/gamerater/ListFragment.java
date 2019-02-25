package edu.lewisu.cs.jdimer.gamerater;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;


public class ListFragment extends Fragment {
    private Button myButton;
    private RecyclerView myRecyclerView;
    private RatingAdapter ratingAdapter;
    private DbAdapter database;

    public ListFragment() {
        //declare a new todoAdapter when the fragment starts
        ratingAdapter = new RatingAdapter();
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        database = new DbAdapter(getActivity());
        database.open();
        Rating_List.Instance().reset();
        fillData();
        //set up the button click listener
        myButton = view.findViewById(R.id.my_button);
        myButton.setOnClickListener(new ratingOnClick(-1));

        //wire up the recyclerview with the adapter and layout manager
        myRecyclerView = view.findViewById(R.id.my_recycler);
        myRecyclerView.setAdapter(ratingAdapter);
        RecyclerView.LayoutManager mLayoutManager =
                new LinearLayoutManager(getActivity().getApplicationContext());
        myRecyclerView.setLayoutManager(mLayoutManager);
    }

    private void fillData(){
        Cursor cursor = database.fetchAllRatings();
        while(cursor.moveToNext()){
            int dbId = cursor.getInt(cursor.getColumnIndex(DbAdapter.KEY_ROWID));
            String title = cursor.getString(cursor.getColumnIndex(DbAdapter.TITLE_NAME));
            String comments = cursor.getString(cursor.getColumnIndex(DbAdapter.EVAL_NAME));
            String genre = cursor.getString(cursor.getColumnIndex(DbAdapter.GENRE_NAME));
            Float rating = cursor.getFloat(cursor.getColumnIndex(DbAdapter.RATING_NAME));
            Rating_List.Instance().saveToDo(-1,new Rating_Model(dbId, title,comments,genre,rating));
        }
    }

    private class ratingOnClick implements View.OnClickListener {
        int position;
        public ratingOnClick(int pos) {
            position = pos;
        }
        @Override
        public void onClick(View v) {
            Intent launchDetail = new Intent(getActivity().getApplication(), Rating_Activity.class);
            launchDetail.putExtra("id",position);
            startActivity(launchDetail);
        }
    }

    private class RatingHolder extends RecyclerView.ViewHolder {
        public TextView title;
        public TextView rating;
        public RatingHolder(View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.row_title);
            rating = itemView.findViewById(R.id.row_rating);
        }
    }

    private class RatingAdapter extends RecyclerView.Adapter<RatingHolder> {
        @Override
        public RatingHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View itemView = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.rating_row, parent, false);

            return new RatingHolder(itemView);
        }

        @Override
        public void onBindViewHolder(RatingHolder holder, int position) {
            //retrieve the todo item and set the values of each control from it
            Rating_Model ratingItem = Rating_List.Instance().getRating(position);
            holder.title.setText(ratingItem.getTitle());
            holder.rating.setText(Float.toString(ratingItem.getRating()));

            //set up an onclick event for each control to launch the detail page
            holder.title.setOnClickListener(new ratingOnClick(position));
            holder.rating.setOnClickListener(new ratingOnClick(position));
        }

        @Override
        public int getItemCount() {
            return Rating_List.Instance().getRatingList().size();
        }
    }
}

