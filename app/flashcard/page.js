'use client'
import Topbar from "../components/topbar";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import getFlashcards from "../api/api";


export default function Page() {
    const [flashcards, setFlashcards] = useState([]);

    // State to keep track of which cards are flipped
    const [flippedCards, setFlippedCards] = useState();

    // Function to handle the flip
    const handleFlip = (index) => {
        setFlippedCards(prevFlipped => {
            const newFlipped = [...prevFlipped];
            newFlipped[index] = !newFlipped[index];
            return newFlipped;
        });
    };
    const loadFlashcards = async () => {
        try {
            const data = await getFlashcards('flashcardSetName');
            console.log('Data received in page:', data)
            if (data && data.flashcards) {
                setFlashcards(data.flashcards);
                setFlippedCards(new Array(data.flashcards.length).fill(false));  // Initialize flippedCards after flashcards are loaded
            } else {
                console.log('no flashcard data found')
                setFlashcards([]);  // Handle case where no flashcards are returned
                setFlippedCards([]);  // Reset flippedCards
            }
        } catch (error) {
            console.error("Failed to load flashcards:", error);
            setFlashcards([]);  // Handle error case by setting flashcards to an empty array
        }
    };
    useEffect(()=> {
        loadFlashcards()
    }, [])

    return (
        <div>
        <Topbar/>
            <style jsx>{`
                .flashcard {
                    perspective: 1000px;
                    width: 200px;
                    height: 300px;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.5s;
                }

                .flashcard-inner {
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                }

                .flashcard.flipped {
                    transform: rotateY(180deg); /* Flip the inner container */
                }

                .flashcard-front,
                .flashcard-back {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    backface-visibility: hidden;
                }

                .flashcard-back {
                    transform: rotateY(180deg); /* Rotate back face to be visible when flipped */
                }
                .card-content-back {
                    padding: 20px;
                    text-align: center;
                    transform: rotateY(180deg)
                }
                .card-content-front {
                    padding: 20px;
                    text-align: center;
                }

            `}</style>


            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Generated Flashcards
                    </Typography>
                    <Grid container spacing={2}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={2} key={index}>
                                <div className={`flashcard ${flippedCards[index] ? 'flipped' : ''}`} onClick={() => handleFlip(index)}>

                                    <div className="flashcard-inner">
                                        {!flippedCards[index] ? (
                                            <Card className="flashcard-front">
                                                <CardContent>
                                                    <div className="card-content-front">
                                                        <Typography variant="h6">Front:</Typography>
                                                        <Typography>{flashcard.front}</Typography>
                                                    </div>

                                                </CardContent>



                                            </Card>
                                        ) : (
                                            <Card className="flashcard-back">
                                                <CardContent>
                                                    <div className="card-content-back">
                                                        <Typography variant="h6" className="GFG">Back:</Typography>
                                                        <Typography>{flashcard.back}</Typography>
                                                    </div>

                                                </CardContent>




                                            </Card>
                                        )}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </div>
    );
}
