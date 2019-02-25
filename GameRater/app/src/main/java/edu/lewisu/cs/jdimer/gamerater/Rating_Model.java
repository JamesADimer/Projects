package edu.lewisu.cs.jdimer.gamerater;

/**
 * Created by thein on 4/5/2018.
 */

public class Rating_Model {

    public Rating_Model(int id, String title, String comments, String genre, Float rating) {
        this.id = id;
        this.title = title;
        this.comments = comments;

        this.genre = genre;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    private String title;
    private String comments;
    private String genre;
    private Float rating;
    private int id;
}
