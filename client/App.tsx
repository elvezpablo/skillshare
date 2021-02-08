import React, { useState } from 'react';
import { ThemeProvider} from 'styled-components';
import theme from './theme.json';
import { LinkResponse } from "../types/common"
import {getShortUrl} from "./services";
import { GlobalStyle, Label, Heading, Comment, Column, Button, Processed} from "./Styles";

const DEFAULT_STR = "Hey, check out this awesome typography class on Skillshare from Aaron Draplin! https://www.skillshare.com/classes/Customizing-Type/1395825904";

const App = () => {
    const [comment, setComment] = useState(DEFAULT_STR);
    const [processed, setProcessed] = useState<string | null>(null);

    const handleSubmit = async () => {
        const findTags = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

        const links = [...comment.matchAll(findTags)].map(async match => await getShortUrl(match[0]));
        const shortLinks = await Promise.all<LinkResponse>(links);
        let replaced = comment;
        shortLinks.forEach(({ links }) => {
            if (links) {
                Object.keys(links).forEach(link => {
                    replaced = replaced.replace(link, `<a href="${links[link]}">${link}</a>`);
                    console.log(replaced);
                })
            }
        })
        setProcessed(replaced);
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Column>
                <Heading>{`Skillshare: Link Shortener`}</Heading>
                <Label>
                    <div>Comment:</div>
                    <Comment onChange={(e) => setComment(e.target.value)} value={comment} />
                </Label>
                <Button onClick={handleSubmit}>Submit</Button>
                {processed && <Processed dangerouslySetInnerHTML={{ __html: processed }}></Processed>}
            </Column>
        </ThemeProvider>
    )
}

export default App;