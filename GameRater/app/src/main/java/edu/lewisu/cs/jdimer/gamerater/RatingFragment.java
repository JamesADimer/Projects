package edu.lewisu.cs.jdimer.gamerater;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RatingBar;
import android.widget.Spinner;
import android.widget.Toast;

import static android.widget.Toast.LENGTH_SHORT;


public class RatingFragment extends Fragment {
    private EditText gameTitle;
    private EditText gameEval;
    private RadioGroup radioGroup;
    private RadioButton radioButton;
    private RatingBar ratingBar;
    private Button submitRating;
    private Rating_Model ratingModel;
    private Button delete;
    private int id;
    private DbAdapter database;

    public RatingFragment() {

    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_rating, container, false);


    }

    @Override
    public void onViewCreated(final View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        database = new DbAdapter(getActivity());
        database.open();
        gameTitle = (EditText)view.findViewById(R.id.game_title);
        gameEval = (EditText) view.findViewById(R.id.comments);
        radioGroup = (RadioGroup) view.findViewById(R.id.genre);
        ratingBar = (RatingBar) view.findViewById(R.id.rating_bar);
        submitRating = (Button) view.findViewById(R.id.submit);
        delete = (Button) view.findViewById(R.id.delete);

        Intent sender = getActivity().getIntent();
        id = sender.getIntExtra("id", 0);
        if (id == -1) {
            ratingModel = new Rating_Model(-1,"", "", "", 3f);
        } else {
            ratingModel = Rating_List.Instance().getRating(id);
            gameTitle.setText(ratingModel.getTitle());
            gameEval.setText(ratingModel.getComments());
            switch(ratingModel.getGenre()){
                case "RPG":
                    radioGroup.check(R.id.rpg);
                    break;
                case "FPS":
                    radioGroup.check(R.id.fps);
                    break;
                case "strategy":
                    radioGroup.check(R.id.strategy);
                    break;
            }
            ratingBar.setRating(ratingModel.getRating());
        }

        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener()
        {
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch(checkedId){
                    case R.id.rpg:
                        ratingModel.setGenre("RPG");
                        break;
                    case R.id.fps:
                        ratingModel.setGenre("FPS");
                        break;
                    case R.id.strategy:
                        ratingModel.setGenre("Strategy");
                        break;
                }
            }
        });


        gameTitle.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                ratingModel.setTitle(editable.toString());
            }
        });
        gameEval.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                ratingModel.setComments(editable.toString());
            }
        });
        ratingBar.setOnRatingBarChangeListener(new RatingFragment.RatingChanged());
        submitRating.setOnClickListener(new RatingFragment.SubmitClickListener());
        delete.setOnClickListener(new RatingFragment.DeleteClickListener());
    }



    private class RatingChanged implements RatingBar.OnRatingBarChangeListener{
        @Override
        public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser){
            Toast.makeText(getActivity(), String.valueOf(ratingBar.getRating()),
                    LENGTH_SHORT).show();
            ratingModel.setRating(rating);
        }
    }

    private class GenreClickListener implements View.OnClickListener {
        @Override
        public void onClick(View view) {

        }
    }

    private class DeleteClickListener implements View.OnClickListener {
        @Override
        public void onClick(View view) {
            if (id != -1) {
                database.deleteRating(ratingModel.getId());
            }
            Intent launchTodo = new Intent(getActivity().getApplication(), ListActivity.class);
            startActivity(launchTodo);
        }
    }

    private class SubmitClickListener implements View.OnClickListener {
        @Override
        public void onClick(View view) {
            Toast.makeText(getActivity(), "Game: " + ratingModel.getTitle() + "\nGenre: " + ratingModel.getGenre() + "\nEval: "
                            + ratingModel.getComments() + "\nRating: " + String.valueOf(ratingModel.getRating()),
                    LENGTH_SHORT).show();
            //update the todo model from the ui components
            ratingModel.setTitle(gameTitle.getText().toString());
            ratingModel.setComments(gameEval.getText().toString());
            switch(radioGroup.getCheckedRadioButtonId()){
                case R.id.rpg:
                    ratingModel.setGenre("RPG");
                    break;
                case R.id.fps:
                    ratingModel.setGenre("FPS");
                    break;
                case R.id.strategy:
                    ratingModel.setGenre("strategy");
                    break;
            }
            ratingModel.setRating(ratingBar.getRating());

            //save the todo item from the list
            if (id == -1){
                database.createRating(ratingModel.getTitle(),ratingModel.getComments(),ratingModel.getGenre(),ratingModel.getRating());
            } else {
                database.updateRating(ratingModel.getId(),ratingModel.getTitle(),ratingModel.getComments(),ratingModel.getGenre(),ratingModel.getRating());
            }

            //go back to the list activity
            Intent launchTodo = new Intent(getActivity().getApplication(), ListActivity.class);
            startActivity(launchTodo);
        }
    }

}
